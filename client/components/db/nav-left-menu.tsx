import React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { SiMake } from "react-icons/si";
import { SlList, SlBag, SlBookOpen, SlSocialInstagram, SlSocialFacebook, SlSocialPintarest, SlCalender, SlPeople, SlChart, SlRefresh, SlSettings, SlWrench } from "react-icons/sl";

interface INavLeftMenuProps {
  active: string
}

function NavLeftMenu(
  { active }: INavLeftMenuProps
) {
  return (
    <nav>
    <div>  
    <Command className='mt-4 rounded-none'>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Каталог">
      <CommandItem><SlList className="text-gray-600"/><span>Категории</span></CommandItem>
      <CommandItem><SlBag className="text-gray-600"/><span>Продукты</span></CommandItem>
      <CommandItem><SlBookOpen className="text-gray-600"/><span>Информация</span></CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Социальные сети">
      <CommandItem><SlSocialInstagram className="text-gray-600"/><span>Instagram</span></CommandItem>      
      <CommandItem><SlSocialFacebook className="text-gray-600"/><span>Meta</span></CommandItem>
      <CommandItem><SlSocialPintarest className="text-gray-600"/><span>Pinterest</span></CommandItem>      
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Анализ">
      <CommandItem><SlCalender className="text-gray-600"/><span>Заказы</span></CommandItem>     
      <CommandItem><SlPeople className="text-gray-600"/><span>Клиенты</span></CommandItem>
      <CommandItem><SlChart className="text-gray-600"/><span>Анализ</span></CommandItem>      
      <CommandItem><SlRefresh className="text-gray-600"/><span>Экспорт/Импорт</span></CommandItem>      
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Настройки">
      <CommandItem><SlSettings className="text-gray-600"/><span>Основные</span></CommandItem>
      <CommandItem><SlWrench className="text-gray-600"/><span>Социальные сети</span></CommandItem>      
    </CommandGroup>
  </CommandList>
</Command>
    </div>
    </nav>
  )
}

export default NavLeftMenu
