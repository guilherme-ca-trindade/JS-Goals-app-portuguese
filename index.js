const{select}=require('@inquirer/prompts')

const start = async () =>{
    while(true){
        
        const option= await select({
            message: 'Menu >',
            choices:[
                {
                    name:'Cadastrar meta',
                    value:'cadastrar'
                },
                { 
                    name:'Listar meta',
                    value:'listar'
                },
                {
                    name:'Sair',
                    value:'sair'
                }
            ]
        })

        switch(option){
            case'cadastrar':
                console.log('vamos cadastrar')
                break
            case'listar':
                console.log('vamos listar')
                break
            case'sair':
                console.log('Ate a proxima')
                return

        }
    }
}

start()