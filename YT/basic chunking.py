from langchain_text_splitters import RecursiveCharacterTextSplitter

text = """

Hey my name is Rohit deka. 
I have always wanted to be a super hero.
I thought I will get powers if i meditate and pray to god.
but i never got any powers and I still pray.
But i think i will not get those powers any day soon now.
"""

splitter = RecursiveCharacterTextSplitter(
    chunk_size=100, #max size of each chunk 
    chunk_overlap=20 #overlap between chunks
)

chunks = splitter.split_text(text)

for i, chunk in enumerate(chunks):
    print(f"\nChunk {i+1}:\n{chunk}") 