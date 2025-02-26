# Warehouse picking optimization

Aplikácia slúži na optimalizáciu trasy skladníka v sklade pri vybavovaní objednávky.
Hľadá najkratšiu trasu medzi produktmi z objednávky v ich umiestnení v sklade. Pracuje v 3D modely a ignoruje skladové prekážky alebo umiestnenie schodiska.
Použitý je algoritmus najbližšieho suseda za pomoci euklidovskej funkcie.

## Environment Variables

Vytvorenie .env súboru kópiou z .env.sample.

`API_KEY` **Required**

`PORT` _Optional_

`WAREHOUSE_URL` _Optional_

## Run Locally

Inštalácia závislostí

```bash
  npm install
```

Štart servera

```bash
  npm run start
```

## API

#### Výpočet najkratšej trasy a poradie produktov

```http
  GET /warehouse/pick-order
```

### Request

#### Body (JSON)

```json
{
  "products": ["product-1", "product-2"],
  "startingPosition": {
    "x": 0,
    "y": 0,
    "z": 0
  }
}
```

| Parameter        | Type          |
| ---------------- | ------------- |
| products         | array<string> |
| startingPosition | object        |
| x                | number        |
| y                | number        |
| z                | number        |

### Response

#### Success Response

**Code**: `200 OK`

```json
{
  "message": "Order received and optimization of picking order is ready.",
  "optimizedRoute": {
    "distance": 14,
    "pickingOrder": [
      {
        "productId": "product-1",
        "positionId": "position-31"
      },
      {
        "productId": "product-2",
        "positionId": "position-241"
      }
    ]
  }
}
```
