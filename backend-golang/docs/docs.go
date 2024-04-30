// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "email": "fiber@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api/product/category": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "category",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Page number",
                        "name": "page",
                        "in": "query",
                        "required": true
                    },
                    {
                        "description": "Filter Body",
                        "name": "filter",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/entities.Filter"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/definitions/ent.ProductInfo"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "type": "int"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "type": "int"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "type": "int"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "ent.OrderHistory": {
            "type": "object",
            "properties": {
                "address_id": {
                    "description": "AddressID holds the value of the \"address_id\" field.",
                    "type": "string"
                },
                "edges": {
                    "description": "Edges holds the relations/edges for other nodes in the graph.\nThe values are being populated by the OrderHistoryQuery when eager-loading is set.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.OrderHistoryEdges"
                        }
                    ]
                },
                "id": {
                    "description": "ID of the ent.",
                    "type": "string"
                },
                "order_status": {
                    "description": "OrderStatus holds the value of the \"order_status\" field.",
                    "type": "string"
                },
                "order_total_price": {
                    "description": "OrderTotalPrice holds the value of the \"order_total_price\" field.",
                    "type": "integer"
                },
                "ordered_at": {
                    "description": "OrderedAt holds the value of the \"ordered_at\" field.",
                    "type": "string"
                },
                "payment_info": {
                    "description": "PaymentInfo holds the value of the \"payment_info\" field.",
                    "type": "string"
                },
                "payment_key": {
                    "description": "PaymentKey holds the value of the \"payment_key\" field.",
                    "type": "string"
                },
                "payment_method": {
                    "description": "PaymentMethod holds the value of the \"payment_method\" field.",
                    "type": "string"
                },
                "payment_status": {
                    "description": "PaymentStatus holds the value of the \"payment_status\" field.",
                    "type": "string"
                },
                "user_id": {
                    "description": "UserID holds the value of the \"user_id\" field.",
                    "type": "string"
                },
                "user_order_number": {
                    "description": "UserOrderNumber holds the value of the \"user_order_number\" field.",
                    "type": "integer"
                }
            }
        },
        "ent.OrderHistoryEdges": {
            "type": "object",
            "properties": {
                "order_rows": {
                    "description": "OrderRows holds the value of the order_rows edge.",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ent.OrderRow"
                    }
                },
                "user": {
                    "description": "User holds the value of the user edge.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.User"
                        }
                    ]
                },
                "user_addre": {
                    "description": "UserAddre holds the value of the user_addre edge.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.UserAddress"
                        }
                    ]
                }
            }
        },
        "ent.OrderRow": {
            "type": "object",
            "properties": {
                "delivery_company": {
                    "description": "DeliveryCompany holds the value of the \"delivery_company\" field.",
                    "type": "string"
                },
                "delivery_number": {
                    "description": "DeliveryNumber holds the value of the \"delivery_number\" field.",
                    "type": "string"
                },
                "delivery_status": {
                    "description": "DeliveryStatus holds the value of the \"delivery_status\" field.",
                    "type": "string"
                },
                "edges": {
                    "description": "Edges holds the relations/edges for other nodes in the graph.\nThe values are being populated by the OrderRowQuery when eager-loading is set.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.OrderRowEdges"
                        }
                    ]
                },
                "id": {
                    "description": "ID of the ent.",
                    "type": "integer"
                },
                "order_id": {
                    "description": "OrderID holds the value of the \"order_id\" field.",
                    "type": "string"
                },
                "quantity": {
                    "description": "Quantity holds the value of the \"quantity\" field.",
                    "type": "integer"
                },
                "size": {
                    "description": "Size holds the value of the \"size\" field.",
                    "type": "string"
                },
                "sku": {
                    "description": "Sku holds the value of the \"sku\" field.",
                    "type": "integer"
                }
            }
        },
        "ent.OrderRowEdges": {
            "type": "object",
            "properties": {
                "order_history": {
                    "description": "OrderHistory holds the value of the order_history edge.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.OrderHistory"
                        }
                    ]
                },
                "product_info": {
                    "description": "ProductInfo holds the value of the product_info edge.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.ProductInfo"
                        }
                    ]
                }
            }
        },
        "ent.ProductInfo": {
            "type": "object",
            "properties": {
                "brand": {
                    "description": "Brand holds the value of the \"brand\" field.",
                    "type": "string"
                },
                "category": {
                    "description": "Category holds the value of the \"category\" field.",
                    "type": "string"
                },
                "categorySpec": {
                    "description": "CategorySpec holds the value of the \"categorySpec\" field.",
                    "type": "string"
                },
                "color": {
                    "description": "Color holds the value of the \"color\" field.",
                    "type": "string"
                },
                "deploy": {
                    "description": "Deploy holds the value of the \"deploy\" field.",
                    "type": "integer"
                },
                "edges": {
                    "description": "Edges holds the relations/edges for other nodes in the graph.\nThe values are being populated by the ProductInfoQuery when eager-loading is set.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.ProductInfoEdges"
                        }
                    ]
                },
                "imgType": {
                    "description": "ImgType holds the value of the \"imgType\" field.",
                    "type": "string"
                },
                "intl": {
                    "description": "Intl holds the value of the \"intl\" field.",
                    "type": "boolean"
                },
                "korBrand": {
                    "description": "KorBrand holds the value of the \"korBrand\" field.",
                    "type": "string"
                },
                "korProductName": {
                    "description": "KorProductName holds the value of the \"korProductName\" field.",
                    "type": "string"
                },
                "price": {
                    "description": "Price holds the value of the \"price\" field.",
                    "type": "integer"
                },
                "priceAscCursor": {
                    "description": "PriceAscCursor holds the value of the \"priceAscCursor\" field.",
                    "type": "string"
                },
                "priceDescCursor": {
                    "description": "PriceDescCursor holds the value of the \"priceDescCursor\" field.",
                    "type": "string"
                },
                "productId": {
                    "description": "ProductID holds the value of the \"productId\" field.",
                    "type": "string"
                },
                "productName": {
                    "description": "ProductName holds the value of the \"productName\" field.",
                    "type": "string"
                },
                "searchInfo": {
                    "description": "SearchInfo holds the value of the \"searchInfo\" field.",
                    "type": "string"
                },
                "shippingFee": {
                    "description": "ShippingFee holds the value of the \"shippingFee\" field.",
                    "type": "integer"
                },
                "sku": {
                    "description": "ID of the ent.",
                    "type": "integer"
                }
            }
        },
        "ent.ProductInfoEdges": {
            "type": "object",
            "properties": {
                "order_rows": {
                    "description": "OrderRows holds the value of the order_rows edge.",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ent.OrderRow"
                    }
                },
                "sizes": {
                    "description": "Sizes holds the value of the sizes edge.",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ent.Size"
                    }
                }
            }
        },
        "ent.Size": {
            "type": "object",
            "properties": {
                "available": {
                    "description": "Available holds the value of the \"available\" field.",
                    "type": "boolean"
                },
                "edges": {
                    "description": "Edges holds the relations/edges for other nodes in the graph.\nThe values are being populated by the SizeQuery when eager-loading is set.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.SizeEdges"
                        }
                    ]
                },
                "id": {
                    "description": "ID of the ent.",
                    "type": "integer"
                },
                "size": {
                    "description": "Size holds the value of the \"size\" field.",
                    "type": "string"
                },
                "sku": {
                    "description": "Sku holds the value of the \"sku\" field.",
                    "type": "integer"
                },
                "updated_at": {
                    "description": "UpdatedAt holds the value of the \"updated_at\" field.",
                    "type": "string"
                }
            }
        },
        "ent.SizeEdges": {
            "type": "object",
            "properties": {
                "product_info": {
                    "description": "ProductInfo holds the value of the product_info edge.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.ProductInfo"
                        }
                    ]
                }
            }
        },
        "ent.User": {
            "type": "object",
            "properties": {
                "edges": {
                    "description": "Edges holds the relations/edges for other nodes in the graph.\nThe values are being populated by the UserQuery when eager-loading is set.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.UserEdges"
                        }
                    ]
                },
                "email": {
                    "description": "Email holds the value of the \"email\" field.",
                    "type": "string"
                },
                "id": {
                    "description": "ID of the ent.",
                    "type": "string"
                },
                "kr_name": {
                    "description": "KrName holds the value of the \"kr_name\" field.",
                    "type": "string"
                },
                "last_login": {
                    "description": "LastLogin holds the value of the \"last_login\" field.",
                    "type": "string"
                },
                "password": {
                    "description": "Password holds the value of the \"password\" field.",
                    "type": "string"
                },
                "register_at": {
                    "description": "RegisterAt holds the value of the \"register_at\" field.",
                    "type": "string"
                },
                "sign_up_type": {
                    "description": "SignUpType holds the value of the \"sign_up_type\" field.",
                    "type": "string"
                }
            }
        },
        "ent.UserAddress": {
            "type": "object",
            "properties": {
                "custom_id": {
                    "description": "CustomID holds the value of the \"custom_id\" field.",
                    "type": "string"
                },
                "edges": {
                    "description": "Edges holds the relations/edges for other nodes in the graph.\nThe values are being populated by the UserAddressQuery when eager-loading is set.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.UserAddressEdges"
                        }
                    ]
                },
                "en_address": {
                    "description": "EnAddress holds the value of the \"en_address\" field.",
                    "type": "string"
                },
                "en_address_detail": {
                    "description": "EnAddressDetail holds the value of the \"en_address_detail\" field.",
                    "type": "string"
                },
                "en_name": {
                    "description": "EnName holds the value of the \"en_name\" field.",
                    "type": "string"
                },
                "id": {
                    "description": "ID of the ent.",
                    "type": "string"
                },
                "kr_address": {
                    "description": "KrAddress holds the value of the \"kr_address\" field.",
                    "type": "string"
                },
                "kr_address_detail": {
                    "description": "KrAddressDetail holds the value of the \"kr_address_detail\" field.",
                    "type": "string"
                },
                "kr_name": {
                    "description": "KrName holds the value of the \"kr_name\" field.",
                    "type": "string"
                },
                "permanent": {
                    "description": "Permanent holds the value of the \"permanent\" field.",
                    "type": "boolean"
                },
                "phone": {
                    "description": "Phone holds the value of the \"phone\" field.",
                    "type": "string"
                },
                "user_id": {
                    "description": "UserID holds the value of the \"user_id\" field.",
                    "type": "string"
                }
            }
        },
        "ent.UserAddressEdges": {
            "type": "object",
            "properties": {
                "order_histories": {
                    "description": "OrderHistories holds the value of the order_histories edge.",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ent.OrderHistory"
                    }
                },
                "user": {
                    "description": "User holds the value of the user edge.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/ent.User"
                        }
                    ]
                }
            }
        },
        "ent.UserEdges": {
            "type": "object",
            "properties": {
                "order_histories": {
                    "description": "OrderHistories holds the value of the order_histories edge.",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ent.OrderHistory"
                    }
                },
                "user_address": {
                    "description": "UserAddress holds the value of the user_address edge.",
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ent.UserAddress"
                    }
                }
            }
        },
        "entities.Filter": {
            "type": "object",
            "properties": {
                "brand": {
                    "type": "string"
                },
                "category": {
                    "type": "string"
                },
                "categorySpec": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "intl": {
                    "type": "string"
                },
                "price": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                },
                "sizeArray": {
                    "type": "string"
                },
                "sortBy": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8080",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "CAPTURED BACKEND",
	Description:      "This is a sample swagger for Fiber",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}