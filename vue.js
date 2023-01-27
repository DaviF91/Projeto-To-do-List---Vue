let id = 0

new Vue({
    
    el:"#lista",
    data: {
        styleSelect: {
            display: "none"
        },
        
        styleOption: {
            color: "",
            
        },
        
        opcao: "",
        opcoes: [
            {opcao:"A fazer"},
            {opcao:"Em andamento"},
            {opcao:"Finalizado"}
        ],

        novaTarefa: "",  
        tarefas: [],

        tarefaSelecionada: [],
    },
    methods: {
        salvarTarefa(){
            if (this.novaTarefa == "") {
                alert("Por favor digite uma tarefa")
            } 
            else if (this.novaTarefa.length > 100) {
                alert ("A tarefa não pode ter mais que 100 caracteres")
            } 
            else{
                if (this.styleSelect.display == "none" ){
                    this.opcao = "A fazer"
                    this.styleOption.color = "red"
                }
                else if(this.opcao == "Em andamento"){
                    this.styleOption.color = "yellow"
                }
                else if(this.opcao == "Finalizado"){
                    this.styleOption.color = "green"
                }
                
                this.tarefas.push({id: id++, status: this.opcao, texto: this.novaTarefa})
            } 
            this.novaTarefa = ""
            this.styleSelect.display = "none"
        },

        // colorOption(){
        //     // for (var i = 0; i < this.tarefaSelecionada.length; i++){
                
        //     //     if (statusTarefa[i] == "A fazer"){
        //     //         this.styleOption.color = "red"           
        //     //     } 
        //     //     if (statusTarefa[i] == "Em andamento"){
        //     //         this.styleOption.color = "yellow" 
        //     //     }
        //     //     if (statusTarefa[i] == "Finalizado"){
        //     //         this.styleOption.color = "green" 
        //     //     }
        //     // }
        //      Sugestão
        //     var statusTarefa = this.tarefaSelecionada.map(i => i.status)
        //     if (statusTarefa == "A fazer") {
        //         this.styleOption.color = "red"
        //     }
        //     if (statusTarefa == "Em andamento") {
        //         this.styleOption.color = "yellow"
        //     }
        //     if (statusTarefa == "Finalizado") {
        //         this.styleOption.color = "green"
        //     }
        // },
        
        editarTarefa(tarefa){
            this.styleSelect.display = "" 
            this.novaTarefa = tarefa.texto
            this.tarefas = this.tarefas.filter(i => i !== tarefa)
            

            // this.tarefaSelecionada = tarefa
        },

        deletarTarefa(tarefa){
            let valida = prompt("Deseja realmente deletar essa tarefa ?")
            if (valida == "Sim"){
                this.tarefas = this.tarefas.filter(i => i !== tarefa)
            }
        },
    }
})