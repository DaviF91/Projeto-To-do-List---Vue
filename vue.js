

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
                            item.isEditing = false
                        }
                        return item
                    }) 
                }else {
                    this.tarefas.push({id: id++, status: this.opcao, texto: this.novaTarefa, data: this.dataTarefa , isEditing:false})
                }               
                this.idEditar = -1
            } 
            this.novaTarefa = ""
            this.styleSelect.display = "none"
            this.dataVencimento()
            this.ordenarTarefas()
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

        dataVencimento(){
            let hoje = new Date()
            let dia = hoje.getDate().toString().padStart(2,'0')
            let mes = String(hoje.getMonth() + 1).padStart(2,'0')
            let ano = hoje.getFullYear()
            this.dataAtual = `${ano}-${mes}-${dia}` 
        },

        ordenarTarefas(){
            var ordena = this.tarefas
            ordena.sort(function (a,b){
                if (a.status > b.status) {
                    return 1;
                }
                if (a.status < b.status) {
                    return -1;
                }
            });
            return 0;
        }
        
        // formataData(){
        //     let ano = this.dataTarefa[0] + this.dataTarefa[1] + this.dataTarefa[2] + this.dataTarefa[3]
        //     let mes = this.dataTarefa[5] + this.dataTarefa[6]
        //     let dia = this.dataTarefa[8] + this.dataTarefa[9]
        //     this.dataTarefa = `${dia}-${mes}-${ano}`
        //     console.log(this.dataTarefa)
        //     // let data = this.dataTarefa
        //     // this.dataTarefa = moment(data).format('DD/MM/YYYY')

        // }
    }
})