'use client';

import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Aws, Github, Mysql, NodeIcon, ReactIcon } from './icons/';
import { LucideIcon, User2 } from 'lucide-react';

const features = [
  {
    name: 'NodeJS',
    description: 'Powerful and efficient backend built with Node.js to handle high-volume email processing securely and reliably.',
    icon: NodeIcon,
  },
  {
    name: 'ReactJS (Typescript)',
    description: 'Responsive and dynamic user interface for managing mail servers, built with ReactJS and TypeScript for robustness.',
    icon: ReactIcon,
  },
  {
    name: 'MySQL',
    description:
      'Structured database for storing email metadata, user accounts, and configuration data, ensuring fast queries and reliability.',
    icon: Mysql,
  },
  {
    name: 'AWS',
    description: 'Utilizing AWS for scalable deployment and SQS for reliable email queuing, ensuring smooth processing.',
    icon: Aws,
  },
];

const people = [
  {
    name: 'Nikhil Joshi',
    role: 'Mail Architecture',
    icon: User2,
  },
  {
    name: 'Prerna Chopra',
    role: 'Frontend Developer',
    icon: User2,
  },
  {
    name: 'Pradeep Kumar',
    role: 'Backend Developer I',
    icon: User2,
  },
  {
    name: 'Namo Dwivedi',
    role: 'Backend Developer II',
    icon: User2,
  },
  {
    name: 'Dev Behal',
    role: 'DB Administrator',
    icon: User2,
  },
];

export function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="font-semibold text-xl  text-indigo-600">
                  Mail <span className="font-light text-gray-600">Sphere</span>
                </span>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link to="/login" className="text-sm/6 font-semibold text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img alt="" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
                </a>
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6">
                    <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Mail service to <br />
                <span className="text-indigo-600">enrich</span> your online <span className="text-indigo-600">business</span>
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Mail Sphere simplifies email communication, empowering your business with reliable, seamless connections to foster growth
                and success.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/inbox"
                  className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start your journey <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
      {/* Tech Stack */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">Tech Stack</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
              Tech & Tools that power our service
            </p>
            <p className="mt-6 text-lg/8 text-gray-600">
              We use a combination of powerful technologies and tools to ensure our service is fast, reliable, and secure.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      {/* Teams Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              Meet our <span className="text-indigo-600">Team.</span>
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Meet the creative minds behind the project, each bringing passion and expertise to make it a success.
            </p>
          </div>
          <ul role="list" className="grid mt-12 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => {
              const Icon: LucideIcon = person.icon as LucideIcon;
              return (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <Icon strokeWidth={1} className="size-16 p-4 bg-gray-50 text-gray-400 rounded-full" />
                    <div>
                      <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                      <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-slate-800 flex justify-between items-center px-8 py-4">
        <span className="text-white font-normal text-sm">
          Made by ❤️ from <span className="font-medium">Nikhil Joshi</span> and <span className="font-medium">Team</span>.
        </span>
        <span className='text-sm text-white flex items-center gap-2'>
          <span>Follow us on{' '} </span><span><Github /></span>
        </span>
      </footer>
    </div>
  );
}
