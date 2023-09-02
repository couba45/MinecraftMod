import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { Fragment, useState } from 'react'

export default function About() {
  let [isOpen, setIsOpen] = useState(false)
  let [userEmail, setUserEmail] = useState('')
  let [comment, setComment] = useState('')

  function addUserComment() {
    axios
      .post('http://localhost:8080/comment', {
        userEmail: userEmail,
        comment: comment
      })
      .then(() => {
        console.log('success')
      })
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className=" inset-0 flex items-center">
        <button
          type="button"
          onClick={openModal}
          className="p-3 font-bold border-2 rounded-md border-emerald-400 text-emerald-400 hover:text-zinc-100 hover:bg-emerald-400 transition"
        >
          Sign Up
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    <div className="text-4xl font-bold leading-6 text-emerald-400 mb-7 text-center">
                      Sign In
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-3">
                      Please enter your e-mail and comment:
                    </p>
                    <form action="">
                      <div className="flex flex-col gap-4">
                        <div>
                          <label htmlFor="user_email" className="font-bold">
                            E-mail:
                          </label>
                          <input
                            type="email"
                            id="user_email"
                            onChange={e => setUserEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-[100%] border-2 border-emerald-400 p-1 rounded-md focus:outline-none "
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="comment" className="font-bold">
                            Comment:
                          </label>
                          <textarea
                            name=""
                            id="comment"
                            onChange={e => setComment(e.target.value)}
                            className="h-24 w-[100%] border-2 border-emerald-400 p-1 rounded-md focus:drop-shadow-xl focus:outline-none "
                            cols="30"
                            rows="10"
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="submit"
                        onClick={() => addUserComment()}
                        className="rounded-full border-2 border-emerald-400 text-emerald-400 px-4 py-2 mr-4 mt-3 hover:text-zinc-100 hover:bg-emerald-400 transition"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTimeout(() => {
                            setIsOpen(false)
                          }, 0)
                        }}
                        className="rounded-full border-2 border-zinc-900 text-zinc-900 px-4 py-2 mr-4 mt-3 hover:bg-zinc-900 hover:text-white transition ease-in-out"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
