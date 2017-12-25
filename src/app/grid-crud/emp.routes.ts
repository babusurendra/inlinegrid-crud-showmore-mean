import { EmpComponent } from './emp.component';



export const routes = [
    {
        path: '', children: [
            { path: '', component: EmpComponent },
        ]
    },
];