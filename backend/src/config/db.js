import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''

// const MONGO_URL = "mongodb://127.0.0.1:27017/interprint"


const MONGO_URL = "mongodb://rakeshtamboli006688:Mh6EBlSADVfEFnad@ac-qm5lva9-shard-00-00.q8bdnl4.mongodb.net:27017,ac-qm5lva9-shard-00-01.q8bdnl4.mongodb.net:27017,ac-qm5lva9-shard-00-02.q8bdnl4.mongodb.net:27017/?ssl=true&replicaSet=atlas-52qw5b-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"






const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}
export default config