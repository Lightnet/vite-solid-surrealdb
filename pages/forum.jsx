/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import AuthAccess from '../components/auth/surrealdb/AuthAccess.jsx';
import ForumIndex from '../components/forum/ForumIndex.jsx';
//import { createEffect } from 'solid-js'

export default function PageForum() {

  return (
    <AuthAccess>
      <ForumIndex/>
    </AuthAccess>
  )
}