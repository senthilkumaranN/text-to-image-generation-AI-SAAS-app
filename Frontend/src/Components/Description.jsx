import React from 'react'
import { assets } from '../assets/assets/assets'
import { motion } from "motion/react"

const Description = () => {
    return (
        <motion.div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
        initial={{opacity:0.2,y:100}}
        transition={{duration: 1}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}>
            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
            <p className='text-gray-500 mb-8'>Turn your Imagination into visuals</p>

            <div className='flex flex-col gap-5 md:gap-10 md:flex-col lg:gap-14 lg:flex-col xl:gap-14 xl:flex-row items-center'>
                <img src={assets.sample_img_1} alt='' className='w-80 xl:w-96 rounded-lg' />

                <div>
                    <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
                    <p className='text-gray-600'>An AI Text-to-Image Generator is a type of artificial intelligence model that can generate images from text descriptions. It uses deep
                        learning techniques, primarily Generative AI, to create realistic or artistic images based on the provided input.</p>
                    <p className='text-gray-600'>An AI Text-to-Image Generator is a type of artificial intelligence model that can generate images from text descriptions. It uses deep
                        learning techniques, primarily Generative AI, to create realistic or artistic images based on the provided input.</p>
                </div>
            </div>
        </motion.div>
    )
}

export default Description