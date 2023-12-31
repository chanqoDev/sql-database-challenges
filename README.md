# sql-database-challenges

<details>
  <summary>Challenge 1 => Table: Products</summary>

  | Column Name | Type  |
  |-------------|-------|
  | product_id  | int   |
  | low_fats    | enum  |
  | recyclable  | enum  |

  In SQL, product_id is the primary key for this table.
  low_fats is an ENUM of type ('Y', 'N') where 'Y' means this product is low fat and 'N' means it is not.
  recyclable is an ENUM of types ('Y', 'N') where 'Y' means this product is recyclable and 'N' means it is not.

  Find the ids of products that are both low fat and recyclable.

  Return the result table in any order.

  The result format is in the following example.

  Answer:   
  "SELECT product_id FROM Products WHERE low_fats = 'Y' AND  recyclable = 'Y' "; 

</details>

<details>
  <summary>Challenge 2 =>  Find Customer Referee</summary>

   Table: Customer

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
id is the primary key column for this table.
Each row of this table indicates the id of a customer, their name, and the id of the customer who referred them.
 

Write an SQL query to report the names of the customer that are not referred by the customer with id = 2.

Return the result table in any order.

The query result format is in the following example

Answer :   "SELECT name FROM Customer WHERE referee_id <> 2 OR referee_id IS NULL"; 

</details>
<details>
  <summary>Challenge 3 => Big Countries </summary>
Table: World

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| name        | varchar |
| continent   | varchar |
| area        | int     |
| population  | int     |
| gdp         | bigint  |
+-------------+---------+
In SQL, name is the primary key column for this table.
Each row of this table gives information about the name of a country, the continent to which it belongs, its area, the population, and its GDP value.
 

A country is big if:

it has an area of at least three million (i.e., 3000000 km2), or
it has a population of at least twenty-five million (i.e., 25000000).
Find the name, population, and area of the big countries.

Return the result table in any order.

The result format is in the following example.

</details>