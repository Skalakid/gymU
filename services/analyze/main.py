from dotenv import load_dotenv
from src.models.basket import basket
from concurrent import futures
from src.proto import analyze_pb2_grpc

import os
import asyncio
import grpc
from src.rpc.analyze import BasketAnalyzeServiceImpl


### MAIN ###
async def main() -> None:

    ### GET ENV VARIABLES ###
    port = os.getenv("GRPC_PORT")

    print("Server started, listening on " + port)

    ### PREPARE MODELS' DATA ###
    exercise_baskets, exercise_products = await basket.get_prepared_data()
    print(type(exercise_baskets), type(exercise_products))
    ### SETUP GRPC SERVER ###
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    analyze_pb2_grpc.add_BasketAnalyzeServiceServicer_to_server(
        BasketAnalyzeServiceImpl(exercise_baskets, exercise_products), server
    )

    server.add_insecure_port(f"0.0.0.0:{port}")
    server.start()

    server.wait_for_termination()


### SETUP ENV ###
if __name__ == "__main__":
    load_dotenv()
    print("Analyze service started")
    asyncio.get_event_loop().run_until_complete(main())
