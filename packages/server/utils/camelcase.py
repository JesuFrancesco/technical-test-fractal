from humps.camel import case
from pydantic import BaseModel, ConfigDict


def to_camel(string):
    return case(string)


class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )
