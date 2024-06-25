"""update courses table

Revision ID: 01f66011f2ed
Revises: 4adbf72c3f95
Create Date: 2024-06-25 12:22:47.394182

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '01f66011f2ed'
down_revision = '4adbf72c3f95'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.drop_column('end_time')
        batch_op.drop_column('start_time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('courses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_time', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('end_time', sa.VARCHAR(), nullable=True))

    # ### end Alembic commands ###
