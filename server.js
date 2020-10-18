const {GraphQLServer} = require('graphql-yoga');

const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');
const Operacoes = require('./infraestrutura/operations');

conexao.connect(erro => {
    if (erro) {
        console.log(erro)
    }

    console.log('conectou no banco')

    Tabelas.init(conexao)
})

const Clientes = new Operacoes('cliente');
const Pets = new Operacoes('pet');

const resolvers = {
    Query: {
        status: () => "Servidor rodando!",
        cliente: (root, {id}) => Clientes.buscaPorId(id),
        clientes: () => Clientes.lista(),
        pets: () => Pets.lista(),
        pet: (root, { id}) => Pets.buscaPorId(id)
    },
    Mutation: {
        adicionarCliente: (root, params) => Clientes.adiciona(params),
        atualizarCliente: (root, params) => Clientes.atualiza(params),
        deletarCliente: (root, { id }) => Clientes.deleta(id),
        adicionarPet: (root, params) =>  Pets.adiciona(params),
        atualizarPet: (rot, params) => Pets.atualiza(params),
        deletarPet: (root, { id }) => Pets.deleta(id)
    }
}

const servidor = new GraphQLServer({
    resolvers,
    typeDefs: './schema.graphql'

})

servidor.start(() => console.log('Servidor OK'))
