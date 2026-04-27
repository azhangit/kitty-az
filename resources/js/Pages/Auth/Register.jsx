import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5f4d]">
                        New Member
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-[#2f1d15]">
                        Create your account
                    </h2>
                    <p className="mt-3 text-sm text-[#7d655c]">
                        Join Dubai Street Kitties and start supporting the mission.
                    </p>
                </div>

                <div className="mt-8">
                    <InputLabel htmlFor="name" value="Full Name" className="text-xs font-bold uppercase tracking-wider text-[#6f5449]" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-2 block w-full rounded-full border-[#ead6cf] bg-white px-5 py-3.5 text-sm shadow-none placeholder:text-[#ad948b] focus:border-[#f08063] focus:ring-[#f5b19f]"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email Address" className="text-xs font-bold uppercase tracking-wider text-[#6f5449]" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full rounded-full border-[#ead6cf] bg-white px-5 py-3.5 text-sm shadow-none placeholder:text-[#ad948b] focus:border-[#f08063] focus:ring-[#f5b19f]"
                        placeholder="you@example.com"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-xs font-bold uppercase tracking-wider text-[#6f5449]" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full rounded-full border-[#ead6cf] bg-white px-5 py-3.5 text-sm shadow-none placeholder:text-[#ad948b] focus:border-[#f08063] focus:ring-[#f5b19f]"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-xs font-bold uppercase tracking-wider text-[#6f5449]"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full rounded-full border-[#ead6cf] bg-white px-5 py-3.5 text-sm shadow-none placeholder:text-[#ad948b] focus:border-[#f08063] focus:ring-[#f5b19f]"
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm font-medium text-[#8f6b5f] underline decoration-[#ddb4a6] underline-offset-4 transition hover:text-[#5f4137]"
                    >
                        Already have an account?
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fac2ac] to-[#f08063] px-7 py-3 text-sm font-bold text-[#2f1d15] shadow-[0_8px_24px_rgba(240,128,99,0.28)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {processing ? 'Creating account...' : 'Register'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
