let id = 0
let id1 = 0

new Vue({
    
    el:"#lista",
    data: {
        styleSelect: {
            display: "none"
        },
        
        styleOption: {
            color: ""
        },
        
        opcoes: [
            {opcao:"A fazer", idStatus: id1++},
            {opcao:"Em andamento", idStatus: id1++},
            {opcao:"Finalizado", idStatus: id1++}
        ],

        novaTarefa: "",  
        tarefas: []
    },
    methods: {
        salvarTarefa(){
            if (this.novaTarefa == "") {
                alert("Por favor digite uma tarefa")
            } else if (this.novaTarefa.length > 100) {
                alert ("A tarefa não pode ter mais que 100 caracteres")
            } else {
                if (this.styleSelect.display == "none"){
                    this.opcao = "A fazer"
                }
                
                var idOpcao = this.opcoes.map(i => i.idStatus)
                this.tarefas.push({id: id++, status: this.opcao, idOp: idOpcao, texto: this.novaTarefa})
                this.colorOption()
            }
            this.novaTarefa = ""
            this.styleSelect.display = "none"
        },
        
        editarTarefa(tarefa){
            this.novaTarefa = tarefa.texto
            this.tarefas = this.tarefas.filter(i => i !== tarefa)
            this.styleSelect.display = ""  
        },

        deletarTarefa(tarefa){
            let valida = prompt("Deseja realmente deletar essa tarefa ?")
            if (valida == "Sim"){
                this.tarefas = this.tarefas.filter(i => i !== tarefa)
            }
        },

        colorOption(){
            var statusTarefa = this.tarefas.map(i => i.status)
            var idStatus = this.opcoes.map(i=>i.idStatus)

            for (var i = 0; i < this.tarefas.length; i++){
                
                if (statusTarefa[i] == "A fazer" && idStatus[i] == 0 ){
                    this.styleOption.color = "red"           
                } 
                if (statusTarefa[i] == "Em andamento" && idStatus[i] == 2 ){
                    this.styleOption.color = "yellow" 
                }
                if (statusTarefa[i] == "Finalizado" && idStatus[i] == 3){
                    this.styleOption.color = "green" 
                }
            }
        },
    }
})