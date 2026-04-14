import streamlit as st
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import numpy as np
import time
import os
import re



class SimpleTokenizer:
    def __init__(self):
        self.token2int = {}
        self.int2token = {}
        self.vocab_size = 0
        self.special_tokens = ["<UNK>", "<USER>", "<BOT>", "<END>"]

    def train(self, text):
        tokens = re.findall(r'<\w+>|\w+|\s+|[^\w\s]', text)
        unique_tokens = list(set(tokens))

        for i, token in enumerate(self.special_tokens):
            self.token2int[token] = i
            self.int2token[i] = token

        idx = len(self.special_tokens)
        for t in unique_tokens:
            if t not in self.token2int:
                self.token2int[t] = idx
                self.int2token[idx] = t
                idx += 1

        self.vocab_size = len(self.token2int)
        return tokens

    def encode(self, text):
        tokens = re.findall(r'<\w+>|\w+|\s+|[^\w\s]', text)
        return [self.token2int.get(t, 0) for t in tokens]

    def decode(self, indices):
        return "".join([self.int2token.get(i, "") for i in indices])


class MiniGPT(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, num_layers, max_seq_len):
        super().__init__()

        self.token_emb = nn.Embedding(vocab_size, d_model)
        self.pos_emb = nn.Embedding(max_seq_len, d_model)

        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=n_heads,
            dim_feedforward=d_model * 4,
            dropout=0.1,
            batch_first=True,
            norm_first=True
        )

        self.transformer = nn.TransformerEncoder(
            encoder_layer,
            num_layers=num_layers
        )

        self.ln = nn.LayerNorm(d_model)
        self.fc = nn.Linear(d_model, vocab_size)

    def forward(self, x):
        B, T = x.size()

        pos = torch.arange(0, T, device=x.device).unsqueeze(0).expand(B, T)
        x = self.token_emb(x) + self.pos_emb(pos)


        mask = torch.triu(torch.ones(T, T, device=x.device), diagonal=1)
        mask = mask.masked_fill(mask == 1, float('-inf'))

        out = self.transformer(x, mask=mask)
        out = self.ln(out)

        return self.fc(out)



class TokenDataset(Dataset):
    def __init__(self, data, seq_len):
        self.data = data
        self.seq_len = seq_len

    def __len__(self):
        return len(self.data) - self.seq_len

    def __getitem__(self, i):
        x = self.data[i:i+self.seq_len]
        y = self.data[i+1:i+self.seq_len+1]
        return torch.tensor(x), torch.tensor(y)



def format_text(text):
    blocks = text.split('\n\n')
    result = ""
    for b in blocks:
        lines = b.strip().split('\n')
        if len(lines) >= 2:
            q = lines[0]
            a = " ".join(lines[1:])
            result += f"<USER> {q} <BOT> {a} <END>\n"
    return result



st.title("LAI v2 (by c.a)")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "model.pth"

file = st.file_uploader("Upload txt", type=["txt"])

epochs = st.slider("Epochs", 1, 30, 10)
d_model = st.slider("d_model", 64, 256, 128)
n_heads = st.slider("heads", 2, 8, 4)
layers = st.slider("layers", 1, 4, 2)

if file:
    text = file.read().decode()
    text = format_text(text)

    tokenizer = SimpleTokenizer()
    tokens = tokenizer.train(text)

    data = np.array([tokenizer.token2int[t] for t in tokens])

    dataset = TokenDataset(data, 128)
    loader = DataLoader(dataset, batch_size=32, shuffle=True)

    if st.button("Train"):
        model = MiniGPT(tokenizer.vocab_size, d_model, n_heads, layers, 128).to(device)

        opt = torch.optim.AdamW(model.parameters(), lr=3e-4)
        loss_fn = nn.CrossEntropyLoss()

        model.train()

        for ep in range(epochs):
            for x, y in loader:
                x, y = x.to(device), y.to(device)

                opt.zero_grad()
                logits = model(x)

                loss = loss_fn(
                    logits.view(-1, tokenizer.vocab_size),
                    y.view(-1)
                )

                loss.backward()
                torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                opt.step()

            st.write(f"Epoch {ep+1} Loss: {loss.item():.4f}")

        torch.save({
            "model": model.state_dict(),
            "tok": tokenizer.token2int,
            "inv": tokenizer.int2token,
            "vocab": tokenizer.vocab_size,
            "cfg": (d_model, n_heads, layers)
        }, MODEL_PATH)

        st.success(" Trained!")



if os.path.exists(MODEL_PATH):
    ckpt = torch.load(MODEL_PATH, map_location=device)

    tokenizer = SimpleTokenizer()
    tokenizer.token2int = ckpt["tok"]
    tokenizer.int2token = ckpt["inv"]
    tokenizer.vocab_size = ckpt["vocab"]

    d_model, n_heads, layers = ckpt["cfg"]

    model = MiniGPT(tokenizer.vocab_size, d_model, n_heads, layers, 128).to(device)
    model.load_state_dict(ckpt["model"])
    model.eval()

    msg = st.chat_input("yek1exo say sth daaa")

    if msg:
        st.chat_message("user").write(msg)

        tokens = tokenizer.encode(f"<USER> {msg} <BOT>")

        out = ""

        for _ in range(100):
            x = torch.tensor([tokens[-128:]]).to(device)

            with torch.no_grad():
                logits = model(x)

            logits = logits[0, -1] / 0.8
            probs = torch.softmax(logits, dim=0).cpu().numpy()

            nxt = np.random.choice(len(probs), p=probs)
            tokens.append(nxt)

            word = tokenizer.int2token.get(nxt, "")

            if word == "<END>":
                break

            out += word

        st.chat_message("assistant").write(out)
