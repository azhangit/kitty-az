import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {status && (
                <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a5f4d]">
                        Member Area
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-[#2f1d15]">
                        Login to your account
                    </h2>
                    <p className="mt-3 text-sm text-[#7d655c]">
                        Continue your rescue and adoption journey.
                    </p>
                </div>

                <div className="mt-8">
                    <InputLabel htmlFor="email" value="Email Address" className="text-xs font-bold uppercase tracking-wider text-[#6f5449]" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full rounded-full border-[#ead6cf] bg-white px-5 py-3.5 text-sm shadow-none placeholder:text-[#ad948b] focus:border-[#f08063] focus:ring-[#f5b19f]"
                        placeholder="you@example.com"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
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
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-5 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded border-[#d4bcb2] text-[#f08063] focus:ring-[#f08063]"
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-[#6f5449]">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-[#8f6b5f] underline decoration-[#ddb4a6] underline-offset-4 transition hover:text-[#5f4137]"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#fac2ac] to-[#f08063] px-7 py-3 text-sm font-bold text-[#2f1d15] shadow-[0_8px_24px_rgba(240,128,99,0.28)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </div>

                <p className="mt-7 text-center text-sm text-[#7d655c]">
                    New here?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-[#9a5f4d] underline decoration-[#ddb4a6] underline-offset-4 transition hover:text-[#6a4337]"
                    >
                        Create an account
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
