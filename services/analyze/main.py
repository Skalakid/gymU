from dotenv import load_dotenv
from src.models.basket import basket
from src.services.database import PrismaClient
from src.utils import save_model, load_model

import asyncio


### MAIN ###
async def main() -> None:
    ## This function main is currently used for testing purposes
    ## In the future we will use it for different purposes
    await basket.train_job()


### SETUP ENV ###
if __name__ == "__main__":
    load_dotenv()
    print("Analyze service started")
    asyncio.get_event_loop().run_until_complete(main())
