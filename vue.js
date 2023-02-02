Vue.component('input-text-counter',{
    props:["value"],

    data: function(){
        return {
            limitarCaracter: "",
            
             
        }
    },
    methods: {
        
       
    },
    template:`
            <div>
                <div class="template">
                    <label for="">Limitar descrição: </label>
                    <select name="" v-model="limitarCaracter">
                        <option value="false">Não</option>
                        <option value="true">Sim</option>
                    </select>
                </div>
                <div v-if="limitarCaracter == 'true'" class="template2">
                    <input type="text"  
                        :value="value" 
                        @input="$emit('input', $event.target.value)"  
                        placeholder="Nome da tarefa"
                        maxlength="100"
                    ><span>{{value.length}}/100</span>
                </div>
                <div v-else class="template2">
                    <input type="text"  
                        :value="value" 
                        @input="$emit('input', $event.target.value)"  
                        placeholder="Nome da tarefa"
                        maxlength=""
                    >
                    <span :style="cor"> 
                        {{value.length}}/100
                    </span>
                </div>
            </div>
    `
})


let id = 0
new Vue({
    el:"#lista",
    data: {
        styleSelect: {
            display: "none",
            color:"#495057"
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
    },
    methods: {
        salvarTarefa(idTarefa){
            if (this.novaTarefa == "") {
                alert("Por favor digite uma tarefa")
            } 
            else if (this.novaTarefa.length > 100) {
                alert ("A tarefa não pode ter mais que 100 caracteres")
            } 
            else{
                if (this.styleSelect.display == "none" ){
                    this.opcao = "A fazer"
                }
                
                var novaTarefa = this.novaTarefa
                var novaOpcao = this.opcao
                var novaData = this.dataTarefa
                
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
                    this.tarefas.push({nivel: 0, id: id++, status: this.opcao, texto: this.novaTarefa, data:  this.dataTarefa})
                }               
                this.idEditar = -1
            } 
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
        
        dataVencimento(){
            let hoje = new Date()
            let dia = hoje.getDate().toString().padStart(2,'0')
            let mes = String(hoje.getMonth() + 1).padStart(2,'0')
            let ano = hoje.getFullYear()
            this.dataAtual = `${ano}-${mes}-${dia}` 
        },
        
        ordenarTarefas(){
            this.tarefas.sort((a,b)=>{
                return a.status.localeCompare(b.status) //para strings utilizar .localeCompare
            });
        },


        ativaDesativaImportancia(nivel, idTarefa){
            if(idTarefa != -1){
                this.tarefas.map(item => {
                    if(nivel == 0 && item.id == idTarefa){
                        return item.nivel= 1
                        
                    }else if(nivel == 1 && item.id == idTarefa){
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
            });
            return 0;
        }
    }
})