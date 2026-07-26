from transformers import pipeline

pipe = pipeline("image-text-to-text",model="google/gemma-3-4b-it")

messages = [
    {
        "role":"user",
        "content" :[
            {"type":"image", "url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBXg-XwXYfgYIF7YR0qzcdCSJLALZMxEKKHo9NtUpHk58LtFUj-S2qG_W9kQPTXHid73ij4nJORUG4Yq1-d-2pFhslIsOPg8g7wgffA&s=10"},
            {"type":"text","text":"what bike is this?"}
        ]
    }
]

pipe(text=messages)