import { Link, useLocation } from 'react-router-dom';
import { LucideIcon, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/shadcn/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/shadcn/dropdown-menu';
import useAuth from '@/utils/useAuth';

export type NavLinkProps = {
  title: string;
  label?: string;
  icon: LucideIcon;
  link: string;
};

interface NavProps {
  isCollapsed: boolean;
  links: NavLinkProps[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const { attemptLogout } = useAuth();
  const location = useLocation();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col w-1/6 pt-4  gap-4 data-[collapsed=true]:py-2 border-r"
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-0 border flex align-center gap-2 rounded-md py-2 px-3 select-none text-sm font-medium mx-2 text-left">
          <UserRound size={16} className="mt-[2px]" />
          My Account
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={attemptLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 border-t pt-4">
        {links.map((link, index) => {
          const isActive = location.pathname === link.link;
          const variant = isActive ? 'default' : 'ghost';
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to="#"
                  className={cn(
                    buttonVariants({ variant, size: 'icon' }),
                    'h-9 w-9',
                    variant === 'default' && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to="#"
              className={cn(
                buttonVariants({ variant, size: 'sm' }),
                variant === 'default' && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span className={cn('ml-auto', variant === 'default' && 'text-background dark:text-white')}>{link.label}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
