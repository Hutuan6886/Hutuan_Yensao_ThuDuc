import Image from 'next/image'
import React from 'react'
const menuList = [
    {id:1, name: 'Tổ Yến', thumbnail:"/images/To-yen-tho-con-long-.jpg"},
    {id:2, name: 'Yến chưng',thumbnail:"/images/yen-hu.png"},
    {id:3, name: 'Set quà biếu tặng',thumbnail:"/images/hop-vuong-do-12-ycs-soi-dai.jpg"},
    {id:4, name: 'Đông trùng hạ thảo',thumbnail:"/images/dong-trung-ha-thao.png"},
]
const MenuList = () => {
  return (
    <div className='flex flex-row items-center justify-center gap-4 2xl:gap-8'>
      {menuList.map((item) => (
        <div key={item.id} className='flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition'>
            <Image src={item.thumbnail} alt={item.thumbnail} width={1920} height={1280} className='w-40 h-auto p-3 bg-white border-2 border-[#613613] rounded-tr-4xl'/>
            <p className='text-[#613613] font-semibold text-xs lg:text-sm xl:text-base'>{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default MenuList
