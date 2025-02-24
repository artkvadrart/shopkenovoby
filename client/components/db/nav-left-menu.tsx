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

interface INavLeftMenuProps {
  active: string
}

function NavLeftMenu(
  { active }: INavLeftMenuProps
) {
  return (
    <nav>
    <div>  {active}

    <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Каталог">
      <CommandItem><a href="#">Категории</a></CommandItem>
      <CommandItem>Продукты</CommandItem>
      <CommandItem>Информация</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Социальные сети">
      <CommandItem>Instagram</CommandItem>      
      <CommandItem>Meta</CommandItem>
      <CommandItem>Pinterest</CommandItem>      
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Анализ">
      <CommandItem>Заказы</CommandItem>      
      <CommandItem>Клиенты</CommandItem>
      <CommandItem>Анализ</CommandItem>      
      <CommandItem>Экспорт/Импорт</CommandItem>      
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Настройки">
      <CommandItem>Основные</CommandItem>
      <CommandItem>Социальные сети</CommandItem>      
    </CommandGroup>
  </CommandList>
</Command>


    </div>
    </nav>
  )
}

export default NavLeftMenu
