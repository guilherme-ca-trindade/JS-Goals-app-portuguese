const{select, input }=require('@inquirer/prompts')

let meta={value:'Tomar 3L litros de agua por dia',
    checked: false
}
let metas=[meta]

const cadastrarMeta=async()=>{
    const meta=await input({message:'Digite sua meta:'})
    if(meta.length==0){
        console.log('A meta nao pode ser vazia.')
        return
    }
    metas.push({value:meta, checked:false})
}

async function start() {
    while (true) {

        const option = await select({
            message: 'Menu >',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar'
                },
                {
                    name: 'Listar meta',
                    value: 'listar'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        switch (option) {
            case 'cadastrar':
                await cadastrarMeta()
                console.log(metas)
                break
            case 'listar':
                console.log('vamos listar')
                break
            case 'sair':
                console.log('Ate a proxima')
                return

        }
    }
}

start()