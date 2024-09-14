const{select, input, checkbox }=require('@inquirer/prompts')
const fs=require("fs").promises

let mensagem='Bem-vindo ao app de metas! =)';
let metas

const carregarMetas=async()=>{ 
    try{
        const dados=await fs.readFile("metas.json","utf-8")
        metas=JSON.parse(dados)
    }
    catch(erro){metas=[]}
}

const salvarMetas=async()=>{
    await fs.writeFile("metas.json",JSON.stringify(metas,null,2))
}

const cadastrarMeta=async()=>{
    const meta=await input({message:'Digite sua meta:'})
    if(meta.length==0){
        mensagem='A meta nao pode ser vazia.'
        return
    }
    metas.push({value:meta, checked:false})

    mensagem='Meta cadastrada com sucesso!'
}

const listarMetas=async()=>{
    if(metas.length==0){
        mensagem='Nao existem metas no momento'
        return}
    const respostas=await checkbox({
        message: 'Use as setas para mudar de meta, o espaco marcar ou desmarcar, e o Enter para finalizar essa etapa.',
        choices:[...metas]
    })

    metas.forEach((m)=>{m.checked=false})

    if(respostas.length==0){
       mensagem='Nenhuma meta selecionada'
        return
    }



    respostas.forEach((resposta)=>{
        const meta=metas.find((m)=>{
            return m.value==resposta
    })
        meta.checked=true
    })
    mensagem='Meta(s) marcada(s) como concluida(s)'
}

const metasRealizadas = async()=>{
    if(metas.length==0){
        mensagem='Nao existem metas no momento'
        return}
    const realizadas=metas.filter((meta)=>{
        return meta.checked
    })
    if(realizadas.length==0){
        mensagem='Nao existem metas realizadas! =('
        return
    }
    await select({
        message: 'Metas Realizadas:'+realizadas.length,
        choices:[...realizadas]
    })
}

const metasAbertas=async()=>{
    if(metas.length==0){
        mensagem='Nao existem metas no momento'
        return}
    const abertas=metas.filter((meta)=>{
        return meta.checked != true
    })
    if(abertas.length==0){
        mensagem='Nao existem metas em aberto'
        return
    }
    await select({
        message: 'Metas em Aberto:'+abertas.length, 
        choices:[...abertas]
    })
}

const deletarMetas=async()=>{
    if(metas.length==0){
        mensagem='Nao existem metas no momento'
        return}
    const metasDesmarcadas= metas.map((meta)=>{
        return{value:meta.value,checked:false}
    })

    const itemsDeletar=await checkbox({
        message: 'Selecione a meta que deseja deletar:',
        choices:[...metasDesmarcadas],
        instructions: false,
    })

   if(itemsDeletar.length==0){
    mensagem='Nenhuma meta selecionada para deletar'
    return
   }

   itemsDeletar.forEach((item)=>{
        metas = metas.filter((meta)=>{
            return meta.value!=item                
        })
   })
   mensagem='Meta(s) deletada(s) com sucesso!'
}

const mostrarMensagem=()=>{
    console.clear();
    if(mensagem!=''){
        console.log(mensagem)
        console.log('')
        mensagem=''
    }
}

async function start() {
    await carregarMetas()
    
    while (true) {
        mostrarMensagem()
        await salvarMetas()

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
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Metas abertas',
                    value: 'abertas'
                },
                {
                    name: 'Deletar metas',
                    value:'deletar'
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
                break
            case 'listar':
                await listarMetas()
                break
            case'realizadas':
                await metasRealizadas()
                break
            case'abertas':
                await metasAbertas()
                break
            case'deletar':
                await deletarMetas()
                break
            case 'sair':
                console.log('Ate a proxima')
                return
        }
    }
}

start()