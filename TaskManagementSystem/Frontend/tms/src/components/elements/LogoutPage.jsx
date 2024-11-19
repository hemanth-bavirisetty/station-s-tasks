import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, Button } from '../ui';

import { Link } from 'react-router-dom';

const LogoutPage = () => {
    const [isOpen, setIsOpen] = useState(true);

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <div className=" flex justify-center items-center h-screen  lg:py-10 lg:px-2 mx-auto bg-gradient-to-br from-red-500/50 via-yellow-500/50 via-green-500/50 
to-blue-500/50  shadow-md p-6">
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogContent>
                    <DialogTitle className="text-2xl font-semibold text-center">
                        You have successfully logged out
                    </DialogTitle>
                    <DialogDescription className="mt-4 text-center text-gray-600">
                        Thank you for using our service. We hope to see you again soon!
                    </DialogDescription>
                    <DialogFooter className="mt-6">
                        <Link to="/" className="text-white">
                            <Button onClick={closeDialog} className="w-full">
                                Return to Login
                            </Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LogoutPage;  