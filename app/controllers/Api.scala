package controllers

import play.api.mvc._
import models.Product

import play.api.libs.json._


/**
 * Created by teschio on 11/22/2015.
 */
class Api extends Controller {

  def product(id: Int) = Action {
    val json = Json.toJson(new Product(id, "product " + id, "this is the product number " + id))(Product.productWrites)
    Ok(json)
  }

}
