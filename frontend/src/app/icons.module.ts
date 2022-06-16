import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Menu, User, LogIn, LogOut, PlusCircle, Edit2, Eye, Trash, Hash, Check, X, Download, Play, StopCircle } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Menu,
  User,
  LogIn,
  LogOut,
  PlusCircle,
  Edit2,
  Eye,
  Trash,
  Hash,
  Check,
  X,
  Download,
  Play,
  StopCircle
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
