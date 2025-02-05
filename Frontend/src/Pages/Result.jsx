import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets/assets'
import { motion } from "framer-motion"
import { AppContext } from '../Context/AppContext'

const Result = () => {
    const [image, setImage] = useState(null)
    const [isImageLoaded, setImageLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')

    const { generateImage, setuserid, setuser,settoken } = useContext(AppContext)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            settoken(storedUser.token)
            setuserid(storedUser.userid)
            setuser(storedUser)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!input.trim()) {
            setLoading(false);
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            const generatedImage = await generateImage(input, storedUser.userid)
            if (generatedImage) {
                setImageLoaded(true)
                setImage(generatedImage)
            }
        }
        setLoading(false)
    }

    return (
        <>
            <motion.form
                onSubmit={handleSubmit}
                className='flex flex-col min-h-[90vh] justify-center items-center'
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div>
                    <div className='relative'>
                        <img src={image || assets.sample_img_1} alt='Generated' className='max-w-sm rounded' />
                        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 
                         ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}></span>
                    </div>
                    <p>{loading ? "Loading..." : ""}</p>
                </div>


                {!isImageLoaded && (
                    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
                        <input
                            type='text'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            placeholder='Describe what you want to generate'
                            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'
                        />
                        <button className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full text-gray-200' type='submit'>
                            Generate
                        </button>
                    </div>
                )}


                {isImageLoaded && (
                    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                        <p
                            onClick={() => { setImage(null); setImageLoaded(false); }}
                            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'
                        >
                            Generate Another
                        </p>
                        <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>
                            Download
                        </a>
                    </div>
                )}
            </motion.form>
        </>
    )
}

export default Result;
