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
            {opcao:"A fazer"},
            {opcao:"Em andamento"},
            {opcao:"Finalizado"}
        ],

        novaTarefa: "",  
        tarefas: [],

        // editaTarefa: "",
        tarefaSelecionada: []

    },
    methods: {
        salvarTarefa(){
            //nova condição != null
            if (this.novaTarefa == "") {
                alert("Por favor digite uma tarefa")
            } 
            else if (this.novaTarefa.length > 100) {
                alert ("A tarefa não pode ter mais que 100 caracteres")
            } 
            // else if (this.novaTarefa == this.editaTarefa) {
            //     this.tarefas.push({id: "", status: this.opcao, texto: this.editaTarefa})
            //     this.novaTarefa = ""
            //     this.styleSelect.display = "none"
            //     this.colorOption(this.tarefaSelecionada)
            // }
            else{
                if (this.styleSelect.display == "none"){
                    this.opcao = "A fazer"
                    //atribuir já a cor
                    this.styleOption.color = "red"
                }
                this.tarefas.push({id: id++, status: this.opcao, texto: this.novaTarefa})
            } 
            this.novaTarefa = ""
            this.styleSelect.display = "none"
            this.colorOption()
        },

        
        editarTarefa(tarefa){
            this.styleSelect.display = "" 
            this.novaTarefa = tarefa.texto
            // this.editaTarefa = this.novaTarefa
            this.tarefas = this.tarefas.filter(i => i !== tarefa)
            
            this.tarefaSelecionada = tarefa
        },
        
        deletarTarefa(tarefa){
            let valida = prompt("Deseja realmente deletar essa tarefa ?")
            if (valida == "Sim"){
                this.tarefas = this.tarefas.filter(i => i !== tarefa)
            }
        },
        
        colorOption(){
            var statusTarefa = this.tarefas.map(i => i.status)
            
    
            for (var i = 0; i < this.tarefas.length; i++){
                
                if (statusTarefa[i] == "A fazer"){
                    this.styleOption.color = "red"           
                } 
                if (statusTarefa[i] == "Em andamento"){
                    this.styleOption.color = "yellow" 
                }
                if (statusTarefa[i] == "Finalizado"){
                    this.styleOption.color = "green" 
                }
            }
        },
    }
})