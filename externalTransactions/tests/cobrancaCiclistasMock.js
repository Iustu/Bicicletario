
const bodyRequest = {
    valor: '10',
    ciclista: '2'
}

const ciclistas = [
    {
        "id": "1",
        "nome": "Joao Gabriel",
        "nascimento": "2023-06-11",
        "cpf": "87942565300",
        "passaporte": {
            "numero": "string",
            "validade": "2023-06-11",
            "pais": "TX"
        },
        "nacionalidade": "string",
        "email": "email@example.com",
        "urlFotoDocumento": "string",
        "senha": "string",
        "meioDePagamento": {
            "nomeTitular": "string",
            "numero": "984602367621417541873846007875805616119812247741040998629140438970271355",
            "validade": "2023-06-11",
            "cvv": "4857"
        },
        "ativo": false,
        "statusAluguel": false
    },
    {
        "id": "2",
        "nome": "Mariana",
        "nascimento": "2023-06-11",
        "cpf": "87942565300",
        "passaporte": {
            "numero": "string",
            "validade": "2024-06-11",
            "pais": "TX"
        },
        "nacionalidade": "string",
        "email": "user@example.com",
        "urlFotoDocumento": "string",
        "senha": "string",
        "meioDePagamento": {
            "nomeTitular": "string",
            "numero": "4242424242424242",
            "validade": "2024-06-11",
            "cvv": "485"
        },
        "ativo": true,
        "statusAluguel": true
    },
    {
        "id": "3",
        "nome": "Joao Pedro",
        "nascimento": "2023-06-11",
        "cpf": "87942565300",
        "passaporte": {
            "numero": "string",
            "validade": "2023-06-11",
            "pais": "TX"
        },
        "nacionalidade": "string",
        "email": "user@example.com",
        "urlFotoDocumento": "string",
        "senha": "string",
        "meioDePagamento": {
            "nomeTitular": "string",
            "numero": "984602367621417541873846007875805616119812247741040998629140438970271355",
            "validade": "2023-06-11",
            "cvv": "4857"
        },
        "ativo": true,
        "statusAluguel": false
    },
    {
        "id": "4",
        "nome": "Jessica",
        "nascimento": "2023-06-11",
        "cpf": "87942565300",
        "passaporte": {
            "numero": "string",
            "validade": "2023-06-11",
            "pais": "TX"
        },
        "nacionalidade": "string",
        "email": "jessica@example.com",
        "urlFotoDocumento": "string",
        "senha": "string",
        "meioDePagamento": {
            "nomeTitular": "string",
            "numero": "984602367621417541873846007875805616119812247741040998629140438970271355",
            "validade": "2023-06-11",
            "cvv": "444"
        },
        "ativo": true,
        "statusAluguel": false
    },
    {
        "id": "5",
        "nome": "User5",
        "nascimento": "2023-06-11",
        "cpf": "87942565300",
        "passaporte": {
            "numero": "string",
            "validade": "2023-06-11",
            "pais": "TX"
        },
        "nacionalidade": "string",
        "email": "user5@example.com",
        "urlFotoDocumento": "string",
        "senha": "string",
        "meioDePagamento": {
            "nomeTitular": "string",
            "numero": "984602367621417541873846007875805616119812247741040998629140438970271355",
            "validade": "2023-06-11",
            "cvv": "4857"
        },
        "ativo": false,
        "statusAluguel": false
    }
];

module.exports = {
    bodyRequest,
    ciclistas,
}