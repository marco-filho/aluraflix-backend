class MissingField extends Error {
    constructor(fields) {
        let printFields = '';
        for (let i = 0; i < fields.length; i++)
            printFields += i+1 != fields.length ? `'${fields[i]}', `  : `e '${fields[i]}'`;
        
        const message = `É necessário preencher os campos ${printFields} para esta requisição`;
        super(message)
    }
}

module.exports = MissingField