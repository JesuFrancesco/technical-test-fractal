from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv()  # Load environment variables from .env file

    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8080, reload=True)
