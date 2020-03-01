import {Request, Response, Application} from "express";
import { ContactController } from "../controllers/contactController";

export class ContactRoutes {
    public contactController: ContactController = new ContactController();

    public routes(app: Application) {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'Welcome to contact manager!'
            })
        })

        app.route('/contacts')
        .get(this.contactController.getContacts)
        .post(this.contactController.addNewContact);
        
        app.route('/contact/:contactId')
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact);
    }
}