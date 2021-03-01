<template >
    <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
        <div class="container">
            <RateCriptForm @add-card="addCard"/>
            <hr class="w-full border-t border-gray-600 my-4" />
            <div>
                <button 
                v-if="page > 1"
                    @click="page = page - 1"
                    class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Назад
                </button>
                <button 
                v-if="hasNextPage"
                    @click="page = page + 1"
                    class="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Вперед
                </button>
                <div>
                    Фильтр: <input v-model="filter"/>
                </div>
            </div>
            <hr class="w-full border-t border-gray-600 my-4" />
            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3"
                v-if="cards.length">
            <RateCriptCard 
                v-for="card in filteredCards()"
                @dalete-card="deleteCard"
                @show-diagramm="showDiagramm"
                :active="sel"
                :key="card.id"
                :card="card"
                />
            </dl>
            <h2 v-else>Add New Card</h2>
            <hr class="w-full border-t border-gray-600 my-4" />
            <RateCriptDiagramm 
                :graph="diagramm"
                :cur="sel"
                @close-diagram="closeDiagramm"/>
        </div>
    </div>
</template>
<script>
import RateCriptForm from './rate-cript-form/RateCriptForm'
import RateCriptCard from './rate-cript-card/RateCriptCard'
import RateCriptDiagramm from './rate-cript-diagramm/RateCriptDiagramm'

export default {
    data(){
        return {
            cards: [],
            sel: null,
            diagramm: [],
            page: 1,
            filter: "",
            hasNextPage: true,
        }
    },

    created(){
        const cardsData = localStorage.getItem("cripta")
        if(cardsData) {
            this.cards = JSON.parse(cardsData)
            this.cards.forEach(card => {
                this.onUpdateCrds(card)
            })
        }

    },

    methods: {
        filteredCards(){
            const start = (this.page - 1) * 6;
            const end = this.page * 6;
            const filteredCard =  this.cards.filter(card => card.currency.includes(this.filter))
            this.hasNextPage = filteredCard.length > end
            return filteredCard.slice(start, end)
        },

        onUpdateCrds(cardName){
            setInterval(async ()=> {
                const respons= await fetch(
                    `https://min-api.cryptocompare.com/data/price?fsym=${cardName?.currency}&tsyms=USD&api_key=2122ba0d44f2dc8891b193ebd53470ee46022cb3fb957a04ce93e373256c800f`
                    );
                const data = await respons.json();
                cardName.cost = data.USD
                if(this.sel?.currency === cardName.currency){
                    this.diagramm.push(data.USD)
                }
            }, 5000)
        },

        addCard(input) { 
            const newCard = {
                    id: (Math.random() * 100).toFixed(2),
                    currency: input,
                    cost: "-"
                }
                this.cards.push(newCard)
                this.filter = ""

                localStorage.setItem("cripta", JSON.stringify(this.cards))

            this.onUpdateCrds(newCard)
        },

        deleteCard(card){
            this.cards = this.cards.filter((item) => item !== card)
            localStorage.setItem("cripta", JSON.stringify(this.cards))
            if(this.sel === card) {
                this.sel = null
            }
        },

        showDiagramm(card){
            this.sel = card
            this.diagramm = []
        },

        closeDiagramm(){
            this.sel = null
        }

    },

    watch: {
        filter(){
            this.page = 1
        }
    },

    components: {
        RateCriptForm, RateCriptCard,
        RateCriptDiagramm
    }
}
</script>
