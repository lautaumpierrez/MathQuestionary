import {Doughnut} from 'vue-chartjs'

export default{
  	extends: Doughnut,
	props: ['data', 'options'],
	data () {
	    return {
	      datacollection: {
	        labels: ['Victorias','Derrotas'],
	        datasets: [
	            {
	              label: 'Data One',
	              backgroundColor:  ['#FFC107','#FF5252'],
	              data: [60,40]
	            },
	          ]
	      }
	    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  },
  methods:{
  	getRandomInt () {
		        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
		    }
  }
}
