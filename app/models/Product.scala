package models

import play.api.libs.functional.syntax._
import play.api.libs.json._

/**
 * Created by teschio on 11/22/2015.
 */
class Product (_id: Int, _name: String, _description: String) {
  def id = _id
  def name = _name
  def description = _description
  def next = id + 1
  def prev = id - 1

}

object Product {
  implicit val productWrites = new Writes[Product] {
    def writes(product: Product) = Json.obj(
      "id" -> product.id,
      "name" -> product.name,
      "description" -> product.description,
      "next" -> product.next,
      "prev" -> product.prev
    )
  }
}


