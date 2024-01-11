from typing import List
from .slack import SlackEvent
from model.db_model import UserSchema, OrderRowInDBSchmea, OrderHistoryInDBSchema


class EventHandler:
    _subscriber = []
    _instance = None

    def __init__(self, slack_channel_id: str) -> None:
        self._subscriber.append(SlackEvent(slack_channel_id))

    def __new__(cls, slack_channel_id: str):
        """싱글톤 패턴 적용"""
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.__init__(slack_channel_id)

        return cls._instance

    def user_registered(self, user: UserSchema):
        for concrete_subscriber in self._subscriber:
            getattr(concrete_subscriber, "user_registered")(user)

    def order(
        self,
        order: OrderHistoryInDBSchema,
        order_item: List[OrderRowInDBSchmea],
    ):
        for concrete_subscriber in self._subscriber:
            getattr(concrete_subscriber, "order")(order, order_item)
