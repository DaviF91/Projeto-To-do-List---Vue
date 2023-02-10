Vue.component('input-checkbox', {
    methods: {
        ativaLimeteCaracter(){
            if(temp.limitarCaracter == false ){
                temp.limitarCaracter= true
            } else if (temp.limitarCaracter== true){
                temp.limitarCaracter= false
            }
        }
    },
    template:`
        <div class="labelCheckbox" >
            <input  type="checkbox"  @click="ativaLimeteCaracter()" class="form-check-input">
            <label>Limitar descrição</label>
        </div>
    `
})

Vue.component('input-text-counter',{
    props:["value","ativar"],

    template:`
        <div>
            <div   v-if="ativar == true" class="template2">
                <input 
                    type="text"  
                    :value="value" 
                    @input="$emit('input', $event.target.value)"  
                    placeholder="Nome da tarefa"
                    maxlength="100"  
                >
                <span 
                    :class="{
                        valorAceito: value.length <= 100 && value.length >0,
                        valorNaoAceito: value.length > 100,
                        valorPadrao: value.length == 0}"
                >
                    {{value.length}}/100
                </span>
            </div>
            <div v-else class="template2">
                <input 
                    type="text"  
                    :value="value" 
                    @input="$emit('input', $event.target.value)"  
                    placeholder="Nome da tarefa"
                    maxlength=""
                >
                <span 
                    :class="{
                        valorAceito: value.length <= 100 && value.length >0,
                        valorNaoAceito: value.length > 100,
                        valorPadrao: value.length == 0}"
                > 
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

        limitarCaracter:false
    },
    methods: {
        salvarTarefa(idTarefa){
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
    },
    template:`
    <div id="lista">
        <input-checkbox></input-checkbox>
        <h1>Lista de Tarefas</h1>
        <div class="cabecalho">
            <input-text-counter class="templateInput" v-model="novaTarefa" :ativar="limitarCaracter" ></input-text-counter>
            <select :style="styleSelect"
                name="select" 
                class="selectStatus" 
                aria-label=".form-select-sm example"
                v-model="opcao"
            >
            <option v-for="(opcao, index) in opcoes" :kei="opcao"  >{{opcao.opcao}}</option>
            </select>
            <input type="date" v-model="dataTarefa" class="inputData"   >
            <button 
                @click="salvarTarefa(idEditar)" 
                class="btn btn-primary" 
                type="button" 
                id="button-addon2"
            >Salvar
            </button>
        </div>
        <p class="semTarefas" v-if="tarefas == ''">Ainda não há tarefas cadastradas</p>
        <table v-else class="table" >
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Item</th>
                    <th scope="col" >Status</th>
                    <th scope="col" >Descrição</th>
                    <th scope="col" >Prazo da Tarefa</th>
                    <th scope="col" ></th>
                </tr>
            </thead>
            <tbody v-for="(tarefa, index) in tarefas" :key="tarefa.id">
                <tr :class="{editing: tarefa.id == idEditar}">
                    <td class="star" 
                        @click="ativaDesativaImportancia(tarefa.nivel, tarefa.id)" 
                        :class="{ativaStar: tarefa.nivel==1, desativaStar: tarefa.nivel==0}">
                        <svg :class="{starIcon: tarefa.status == 'Finalizado'}"  xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill=""><path d="M0 0h24v24H0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>
                    </td>
                    <td :class="{finalizado : tarefa.status=='Finalizado'}">
                        {{tarefa.id}}
                    </td>
                    <td :class="{
                        fazer : tarefa.status=='A fazer', 
                        andamento : tarefa.status=='Em andamento',
                        finalizado : tarefa.status=='Finalizado'}"
                    >
                        {{tarefa.status}}
                    </td>
                    <td id="descricao" :class="{finalizado : tarefa.status=='Finalizado'}">
                        {{tarefa.texto}}
                    </td>
                    <td :class="
                        {expirou: tarefa.data[0] + tarefa.data[1]  < dataAtual[0] + dataAtual[1] 
                            || tarefa.data[3] + tarefa.data[4]  < dataAtual[3] + dataAtual[4]
                            || tarefa.data[8] + tarefa.data[9]  < dataAtual[8] + dataAtual[9],
                        finalizado : tarefa.status=='Finalizado'}" 
                    >
                        {{tarefa.data}}
                    </td>
                    <td>
                        <button class="btn btn-warning" @click="editarTarefa(tarefa)" >Editar</button>   
                        <button class="btn btn-danger" @click="deletarTarefa(tarefa)" >Deletar</button>
                    </td>
                </tr>
            </tbody>
        </table>       
    </div>
    `
})