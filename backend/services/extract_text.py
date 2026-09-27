from pypdf import PdfReader

def extract_text_fromResume(file_path):
    reader=PdfReader(file_path)
    text=""
    for page in reader.pages:
        page_text=page.extract_text()
        if page_text:
            text+=page_text + "\n"
    return text

# text=extract_text_fromResume("./services/Soft_resume.pdf")
# print(text) 

# from pypdf import PdfReader
# reader=PdfReader("soft_resume.pdf")
# print("Number off pages:",len(reader.pages))
# for page in reader.pages:
#     text=page.extract_text()
#     print(text)