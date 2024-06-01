import mangoose from 'mongoose';



export const connectDB = async()=>{
    try {
        const conn = await mangoose.connect(process.env.MONGO_URL)
        console.log(`mongoDB connected `);
        
        
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit(1);

    }
}