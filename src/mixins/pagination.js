import _ from 'lodash'

export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 8,
            pageCount: 0,
            allItems: [],
            items: [],
        }
    },
    methods: {
        setupPagination(allItems) {
            this.allItems = _.chunk(allItems, this.pageSize)
            this.pageCount = _.size(this.allItems)
            return this.items = this.allItems[this.page - 1] || this.allItems[0]
        },
        pageChangeHandler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
    }
}