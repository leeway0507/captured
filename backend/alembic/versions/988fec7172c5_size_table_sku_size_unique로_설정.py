"""size table sku, size unique로 설정

Revision ID: 988fec7172c5
Revises: 879e90ca8b23
Create Date: 2023-10-28 01:38:15.917757

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = "988fec7172c5"
down_revision: Union[str, None] = "879e90ca8b23"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint("_sku_size_uc", "size", ["sku", "size"])
    op.drop_column("user", "last_login_at")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("user", sa.Column("last_login_at", mysql.DATETIME(), nullable=False))
    op.drop_constraint("_sku_size_uc", "size", type_="unique")
    # ### end Alembic commands ###
