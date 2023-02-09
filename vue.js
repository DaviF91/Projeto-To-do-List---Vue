Vue.component('input-checkbox', {
    data: function(){
        return {
            
        }

    },
   
    methods: {
        ativaLimeteCaracter(){
            if(temp.limitarCaracter == false ){
                temp.limitarCaracter= true
            } else if (temp.limitarCaracter== true){
                temp.limitarCaracter= false
            }
            
            // this.valorLimite = this.value
            // console.log(temp.limitarCaracter )
        }
    },
    template:`
        <div class="labelCheckbox" >
            <input   type="checkbox"  @click="ativaLimeteCaracter()">
            <label for="" >Limitar descrição</label>
        </div>`
})


Vue.component('input-text-counter',{
    props:["value", "ativarLimite"],

    data: function(){
        return {
            limite:""
        }

    },

    methods:{
        ativar(){
            if(temp.limitarCaracter == true){
                this.ativarLimite = true
            } else {
                this.ativarLimite = false
            }
        }
    },
    
    template:`
        <div>

            <div   v-if="ativarLimite == true" class="template2">
                <input 
                    
                    type="text"  
                    :value="value" 
                    @input="$emit('input', $event.target.value)"  
                    placeholder="Nome da tarefa"
                    maxlength="100"
                    
                >

                <span :class="{
                        valorAceito: value.length <= 100 && value.length >0,
                        valorNaoAceito: value.length > 100,
                        valorPadrao: value.length == 0}">
                    {{value.length}}/100
                </span>

            </div>

            <div v-else class="template2">
                <input type="text"  
                    :value="value" 
                    @input="$emit('input', $event.target.value)"  
                    placeholder="Nome da tarefa"
                    maxlength=""
                     
                >
                <span :class="{
                        valorAceito: value.length <= 100 && value.length >0,
                        valorNaoAceito: value.length > 100,
                        valorPadrao: value.length == 0}"> 
                    {{value.length}}/100
                </span>
            </div>
        </div>
    `
})


let id = 0
var temp = new Vue({
    el:"#lista",

    data: {
        styleSelect: {
            display: "none",
            color:"#787c80"
        },
        
        opcao: "",
        opcoes: [
            {opcao:"A fazer"},
            {opcao:"Em andamento"},
            {opcao:"Finalizado"}
        ],
        
        idEditar: -1,
        novaTarefa: "",  
        tarefas: [],
        
        dataTarefa: "",
        dataAtual:"",

        comparaData:"",

       limitarCaracter:""
    },
    methods: {
        salvarTarefa(idTarefa){
            console.log(this.limitarCaracter)

            if (this.novaTarefa == "") {
                alert("Por favor digite o nome tarefa")
            }  
            else{
                if (this.styleSelect.display == "none" ){
                    this.opcao = "A fazer"
                }
                
                var novaTarefa = this.novaTarefa
                var novaOpcao = this.opcao
                var novaData = this.formataData(this.dataTarefa)
                
                if(idTarefa != -1){
                    this.tarefas.map(item => {
                        if(item.id == idTarefa){
                            item.status = novaOpcao
                            item.texto = novaTarefa
                            item.data = novaData
                            
                        }
                        return item
                    }) 
                }else {
                    this.tarefas.push({nivel: 0, id: id++, status: this.opcao, texto: this.novaTarefa, data: this.formataData(this.dataTarefa)})
                }               
                this.idEditar = -1
            } 
            this.dataTarefa = ""
            this.novaTarefa = ""
            this.styleSelect.display = "none"
            this.dataVencimento()
            this.ordenarTarefas()
            this.ordenaPorImportancia()
        },
        
        editarTarefa(tarefa){
            this.styleSelect.display = "" 
            this.novaTarefa = tarefa.texto
            this.idEditar = tarefa.id
            
        },
        
        deletarTarefa(tarefa){
            let valida = prompt("Deseja realmente deletar essa tarefa ?")
            if (valida == "Sim"){
                this.tarefas = this.tarefas.filter(i => i !== tarefa)
            }
        },

        formataData(dataTarefa){
            if(dataTarefa == ""){
                return dataTarefa = ""
            }
            var dataInput  = dataTarefa
            var data = new Date(dataInput)
            return dataTarefa = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
        },
        
        dataVencimento(){
            let hoje = new Date()
            return this.dataAtual = hoje.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
        },

        ordenarTarefas(){
            this.tarefas.sort((a,b)=>{
                return a.status.localeCompare(b.status)
            });
        },

        ativaDesativaImportancia(nivel, idTarefa){
            if(idTarefa != -1){
                this.tarefas.map(item => {
                    if(nivel == 0 && item.id == idTarefa){
                        return item.nivel= 1  
                    }
                    else if(nivel == 1 && item.id == idTarefa){
                        return item.nivel=0
                    }
                }) 
            }
            this.ordenaPorImportancia()
        },

        ordenaPorImportancia(){
            this.tarefas.sort((a,b)=>{
                if (a.nivel < b.nivel && a.status != "Finalizado" ) {
                    return 1;
                }
                if (a.nivel > b.nivel && a.status != "Finalizado") {
                    return -1;
                }
            })
            return 0;
        }
    }
})