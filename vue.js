let id = 0

new Vue({
    
    el:"#lista",
    data: {
        styleSelect: {
            display: "none"
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

                if(idTarefa != -1){
                    this.tarefas.map(item => {
                        if(item.id == idTarefa){
                            item.status = novaOpcao
                            item.texto = novaTarefa
                            item.isEditing = false
                        }
                        return item
                    }) 
                }else{
                    this.tarefas.push({id: id++, status: this.opcao, texto: this.novaTarefa, isEditing:false})
                }               
                this.idEditar = -1
            } 
            this.novaTarefa = ""
            this.styleSelect.display = "none"
        },
        
        editarTarefa(tarefa){
            this.styleSelect.display = "" 
            this.novaTarefa = tarefa.texto
            this.idEditar = tarefa.id
            tarefa.isEditing = true
        },

        deletarTarefa(tarefa){
            let valida = prompt("Deseja realmente deletar essa tarefa ?")
            if (valida == "Sim"){
                this.tarefas = this.tarefas.filter(i => i !== tarefa)
            }
        },
    }
})