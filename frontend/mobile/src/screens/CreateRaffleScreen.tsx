import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    date: z.string().min(1, 'La fecha es obligatoria'),
});

type FormData = z.infer<typeof schema>;

export default function CreateRaffleScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('Raffle created:', data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Sorteo</Text>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del sorteo"
                            value={value}
                            onChangeText={onChange}
                        />
                        {errors.name && (
                            <Text style={styles.error}>{errors.name.message}</Text>
                        )}
                    </View>

                )}
            />

            <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha (ej: 10/02/2026)"
                            value={value}
                            onChangeText={onChange}
                        />
                        {errors.date && (
                            <Text style={styles.error}>{errors.date.message}</Text>
                        )}
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
