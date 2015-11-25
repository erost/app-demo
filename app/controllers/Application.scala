package controllers

import play.api._
import play.api.mvc._
import models.Product
import play.api.libs.json._

class Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new Scala application is ready."))
  }

  def product(id: Int) = Action {
    val product = new Product(id, "product " + id, "this is the product number " + id)
    Ok(views.html.product(product, Json.toJson(product)(Product.productWrites).toString()))
  }

}
